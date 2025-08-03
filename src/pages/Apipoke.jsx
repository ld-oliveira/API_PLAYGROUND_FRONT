import '../styles/components/Apipoke.scss';
import imagemFixa from '../assets/images/gengar.webp';


const Apipoke = () => {
    return (
       <main>
        <section className='seaction-titulo'>
        <div className='div-titulo-pokemon'>
            <h1 className='titulo-pokemon'>Aqui sera organizador futuramente.</h1>
            <form>
            <label htmlFor='Nome-do-pokemon'>Digite o nome do pokemon:</label>
            <input 
              type='text'
              id='lugar'
              placeholder='Ex: Gengar'>
            </input>
            <button className='bt-pesquisa'type='Submit'>Buscar</button>
            </form>
        </div>
        </section>

    <seaction className='seaction-pokemon'>
            <div className='div-dados-pokemon'>
            <h3 className='numero-poke'> Numero na pokedex</h3>
            <p className='retorno-numero'>0000</p>
            
            <h3 className='tipagem'>Tipagem</h3>
            <button className='bt-tipo'>tipo1</button>
            <button className='bt-tipo'>tipo2</button>

            <h3 className='fraquezas'>Fraquezas </h3>
            <button className='bt-tipo'>tipo1</button>
            <button className='bt-tipo'>tipo2</button>
            <button className='bt-tipo'>tipo3</button>
            <button className='bt-tipo'>tipo4</button>        
        </div>


        <div className='div-imagem-pokemon'>
            <img className="poke-img" src={imagemFixa} alt="Descrição da imagem" />
        </div>

        <div className='div-descricao-pokemon'>
            <h3>Descrição</h3>
            <div className='caixa-descricao'>
                <p>texto dinamico que entrará a descrição do pokemon</p>
            </div>

        </div>
       </seaction>
    </main>
    )
}

export default Apipoke