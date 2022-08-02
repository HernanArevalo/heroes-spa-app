import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PublicRoute } from '../../src/router/PublicRoute'



describe('pruebas en <PublicRoute />', () => {

    test('debe mostrar el children si no está autenticado', async () => {

        const contextValue = {
            logged: false

        }


        render(
            <AuthContext.Provider value ={ contextValue }>

                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>

            </AuthContext.Provider>
            
        )

        expect( screen.getByText('Ruta Pública')).toBeTruthy();

    })  

    test('debe navegar si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }

        }

        render(
            <AuthContext.Provider value ={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element=
                            {
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                            }
                        />
                        <Route path='marvel' element={<h1>Página de Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Página de Marvel')).toBeTruthy();

    })

})