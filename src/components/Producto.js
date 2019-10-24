import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/productosActions';

const Producto = ({producto}) => {

    // Dispatch para ejecutar la action de borrar
    const dispatch = useDispatch();

    const confirmarEliminarProducto = (id) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Producto eliminado correctamente',
                'success'
              )
                console.log(producto.id);
              dispatch(borrarProductoAction(id))
            }
          })

        

        console.log(id);
        
    }
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">{producto.precio}</span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${producto.id}`} 
                    className="btn btn-primary mr-2">Editar
                </Link>
                <button className="btn btn-danger" onClick={() => confirmarEliminarProducto(producto.id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Producto;

