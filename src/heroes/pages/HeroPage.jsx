import { useMemo } from 'react'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers'


export const HeroPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const hero = useMemo(()=> getHeroById( id ), [ id ] ); 

  const onNavigateBack = () => {
    if( id.includes('dc')){
      navigate('../dc')
    }else{ navigate('../marvel') }
  }


  if ( !hero ){
    return <Navigate to ='/' />
  }

  return (
    <div className='row mt-5 AAAA'>
      <div className="col-4">
        <img 
        src={`/assets/heroes/${ id }.jpg`}
        alt={ hero.superhero }
        className="img-thumbnail"
        />
      </div>

      <div className="col-8">
        <h3 className='mb-4 '>{ hero.superhero }</h3>
        <ul className='p-0'>
          <li className='list-group-item'><b>Alter ego:</b> { hero.alter_ego }</li>
          <li className='list-group-item'><b>Publisher:</b> { hero.publisher }</li>
          <li className='list-group-item'><b>First apperance:</b> { hero.first_appearance }</li>
        </ul>

        <h5 className='mt-3'> Characters </h5>
        <p>{ hero.characters }</p>

        <button className='btn btn-danger'
                onClick={ onNavigateBack }
        >
          Regresar
        </button>

      </div>
    </div>
  )
}
