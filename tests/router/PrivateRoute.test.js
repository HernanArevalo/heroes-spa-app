import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/router/PrivateRoute'



describe('pruebas en <PrivateRoute />', () => {

    test('debe navegar si no está autenticado', async () => {

        const contextValue = {
            logged: false

        }


        render(
            <AuthContext.Provider value ={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='marvel' element=
                            {
                            <PrivateRoute>
                                <h1>Página de Marvel</h1>
                            </PrivateRoute>
                            }
                        />
                        <Route path='login' element={<h1>Página login</h1>} />
                    </Routes>
                    </MemoryRouter >
            </AuthContext.Provider>
        )

        expect( screen.getByText('Página login')).toBeTruthy();

    })  

    test('debe ir al children si está autenticado', () => {

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }

        }

        render(
            <AuthContext.Provider value ={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
            
        )

        expect( screen.getByText('Ruta Privada')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/search?q=batman')

    })


})

// 