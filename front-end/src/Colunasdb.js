const URL_BASE = 'http://192.168.25.228:80';

const requisicaoBasicaGET = async (url) => {
    const requisicao = await fetch(`${URL_BASE}${url}`);
    const json = await requisicao.json();
    return json;
}

const requisicaoBasicaPOST = async (url, jsonBody) => {
    const requisicao = await fetch(`${URL_BASE}${url}`, {
        method: 'POST',
        body: jsonBody,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await requisicao.json();
    return json;
}

export default {
    getAll: async () => {
        return await requisicaoBasicaGET(`/api.php/colunas`);
    },
    dropItem: async (itemID, colunaAlvoID, colunaOrigemID, ordem) => {
        return await requisicaoBasicaPOST(`/api.php/drop`, JSON.stringify({
            item: Number(itemID),
            colunaAlvo: Number(colunaAlvoID),
            colunaOrigem: Number(colunaOrigemID),
            ordem: Number(ordem)
        }));
    }
}