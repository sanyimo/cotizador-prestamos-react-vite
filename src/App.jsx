import { useState, useEffect } from "react"//este y otros son hooks
import Header from "./components/Header"
import Button from "./components/Button"
import {formatearDinero, calcularTotalPagar} from "./helpers/index.js"

function App() {
    const [cantidad, setCantidad] = useState(10000);//un state y una fn q lo modificara//en useState valor inicial
    const [meses, setMeses] = useState(6);
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0);

    useEffect(() => {
        const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
        setTotal(resultadoTotalPagar);
    }, [cantidad, meses]);
    
    //calcula el pago mensual
    useEffect(() => {
        setPago(total / meses);
    }, [total]);

    const MIN = 0;
    const MAX = 20000;
    const STEP = 50;

    function handleChange(e) {
        setCantidad(+e.target.value);
    }
    
    function handleClickDecremento() {
        const valor = cantidad - STEP;
    
        if(valor < MIN) {
          alert('Cantidad no válida');
          return;
        }
    
        setCantidad(valor);
    }
    
    function handleClickIncremento() {
        const valor = cantidad + STEP;
    
        if(valor > MAX) {
          alert('Cantidad no válida');
          return;
        }
    
        setCantidad(valor);
    }
    
    return (//parte reservada a los templates, a la parte visual, lo que se muestra en pantalla, el html
        <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
            <Header />

            <div className='flex justify-between my-6'> 
                <Button 
                    operador='-'
                    fn={handleClickDecremento}
                />
                <Button 
                    operador='+'
                    fn={handleClickIncremento}
                />
            </div>
            
            <input
                type='range' 
                className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
                onChange={handleChange}
                min={MIN}
                max={MAX}
                step={STEP}
                value={cantidad}
            />
            <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
            {formatearDinero(cantidad)}
            </p>

            <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
                Elige un <span className='text-indigo-600'>plazo </span> a pagar
            </h2>

            <select
                className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
                value={meses}
                onChange={ e => setMeses(+e.target.value)}
            >
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
            </select>

            <div className='my-5 space-y-3 bg-gray-50 p-5'>
                <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
                    Resumen <span className='text-indigo-600'>de pagos </span>
                </h2>

                <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
                <p className='text-xl text-gray-500 text-center font-bold'>Total a pagar: {formatearDinero(total)}</p>
                <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} mensuales</p>
            </div>
            
        </div>
    )
}

export default App
