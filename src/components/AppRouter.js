import React, { Component, useContext } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CART_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import {useAuthState} from 'react-firebase-hooks/auth'
import { authContext } from '../Context/AuthContext'

const AppRouter = () => {
    const {auth} = useContext(authContext)
    const [user] = useAuthState(auth)
    return user ? (
        <Switch>
            {privateRoutes.map(({path, Component})=>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={CART_ROUTE} />
        </Switch>
    ):
    (
        <Switch>
            {publicRoutes.map(({path, Component})=>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    )
    
}

export default AppRouter
