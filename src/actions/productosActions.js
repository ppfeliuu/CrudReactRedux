import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, 
    COMENZAR_DESCARGA_PRODUCTOS_EXITOSA, COMENZAR_DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR, PRODUCTO_EDITAR_EXITO, PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO, PRODUCTO_EDITADO_EXITO, PRODUCTO_EDITADO_ERROR } from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear un nuevo producto - function principal
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(nuevoProducto());

        // Insertar API
    clienteAxios.post('/libros', producto)
        .then( respuesta => {
            dispatch(agregarProductoExito(producto));
        })
        .catch(error => {
            dispatch( agregarProductoError());
        })        

    }
}

export const nuevoProducto = () => ( {
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = producto => ( {
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

export const agregarProductoError = error => ( {
    type: AGREGAR_PRODUCTO_ERROR
})

// Obtener Listado de Productos (Consultar API)

export function obtenerProductosActions() {
    return (dispatch) => {
        dispatch( obtenerProductosComienzo() );

        //Consultar API
        clienteAxios.get('/libros')
            .then( respuesta => {
                // console.log(respuesta);
                dispatch( descargaProductosExitosa(respuesta.data));
            })
            .catch(error => {
                console.log(error);
                dispatch ( descargaProductosError() );
            })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const descargaProductosError = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_ERROR    
})

// Funcion que elimina un producto específico

export function borrarProductoAction( id ) {
    return (dispatch) => {
        dispatch( obtenerProductoEliminar() );

        // Eliminar en la API
        clienteAxios.delete(`/libros/${id}`)
            .then(respuesta => {
                // console.log(respuesta);
                dispatch( eliminarProductoExito(id));
            })
            .catch(error => {
                // console.log(error);
                dispatch ( eliminarProductoError() );
            })
    }
}

export  const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id => ( {
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = id => ( {
    type: PRODUCTO_ELIMINADO_ERROR    
})

// Obtener el producto a editar

export function obtenerProductoEditarAction(id) {
    return(dispatch) => {
        dispatch( obtenerProductoAction());

        // Obtener producto de la API
        clienteAxios.get(`/libros/${id}`)
            .then( respuesta => {
                console.log(respuesta.data);
                dispatch( obtenerProductoEditarExito(respuesta.data) );
            })
            .catch(error => {
                console.log(error);
                dispatch ( obtenerProductoEditarError());
            })
    }
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
})

// Modifica un producto en la API y el State
export function editarProductoAction( producto ) {
    return(dispatch) => {
        dispatch(comenzarEdicionProducto());

        // Consulta API
        clienteAxios.put(`/libros/${producto.id}`, producto)
            .then(respuesta => {
                // console.log(respuesta);
                dispatch( editarProductoExito(respuesta.data) );

                Swal.fire(
                    'Guardado',
                    'El producto se actualizó correctamente',
                    'success'
                )
            })
            .catch(error => {
                dispatch( editarProductoError());
            })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR    
})

