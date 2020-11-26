import React, {useEffect, useState} from 'react';
import Dragula from 'react-dragula';
import Colunasdb from '../Colunasdb';
import './Drop2.css';


export default () => {
  const [colunas, setColunas] = useState([]);

  const loadColunas = async () => {
    setColunas([]);
    const colunas = await Colunasdb.getAll();

    if (!colunas['erro']) {
      setColunas(colunas['colunas']);
    }
  }

  const changeItem = async (itemID, colunaAlvoID, colunaOrigem, ordem) => {
    const update = await Colunasdb.dropItem(itemID, colunaAlvoID, colunaOrigem, ordem);

    if (update['erro']) {
      loadColunas();
    }
  }

  useEffect(() => {
    loadColunas();
  }, []);

  useEffect(() => {
    const dragulaDecorator = () => {
      if (document.querySelectorAll(`.container--funil > div > div[data-id]`).length > 0) {
        let cols = [];

        colunas.map((coluna) => {
          return cols.push(document.querySelector(`.container--funil > div > div[data-id="${coluna.id}"]`));
        });

        Dragula(cols)
          .on('drop', function (elemento, colunaAlvo, colunaOrigem, elementoPosterior) {
            elemento.innerHTML += '<br /> **dropado** ' + colunaOrigem.dataset.id + ' => ' + colunaAlvo.dataset.id + '<br />';
            console.log(elemento);
            console.log(colunaAlvo);
            console.log(colunaOrigem);
            console.log(elementoPosterior);

            changeItem(elemento.dataset.id, colunaAlvo.dataset.id, colunaOrigem.dataset.id, elementoPosterior ? elementoPosterior.dataset.ordem : null);
          });
      }
    }

    dragulaDecorator();
  }, [colunas]);

  return(
    <div className='container--funil'>
      {colunas && colunas.map((coluna, key) => (
        <div key={key}>
          <h3>{coluna.descricao.toUpperCase()}</h3>
          <div className='container' data-id={coluna.id} data-name={coluna.descricao}>
          {coluna.itens.map((item, key) => (
              <div key={key} data-id={item.id} data-ordem={item.ordem}>{item.descricao + ` -> ORDEM:${item.ordem}`}</div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
}

