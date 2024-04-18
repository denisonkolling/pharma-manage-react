import axios from "axios";

export const listarFarmacias = async (page = 0, pageSize = 10) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/farmacias?page=${page}&size=${pageSize}`;

  try {
    const response = await axios.get(url);
		
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const paginacaoFarmaciaInfo = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/farmacias`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const infos = {
      totalPaginas: data.totalPages,
      totalItem: data.totalElements,
    };
    return infos;
  } catch (error) {
    throw error;
  }
};


export const aquisicaoMedicamento = async (formData) => {
	try {
		return await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/farmacias/${formData.cnpj}/estoque`,
			formData);
	} catch (e) {
		throw e;
	}
};

export const vendaMedicamento = async (formData) => {
	try {
		return await axios.put(
			`${import.meta.env.VITE_API_BASE_URL}/farmacias/${formData.cnpj}/estoque`,
			formData
		);
	} catch (e) {
		throw e;
	}
};

export const salvarMedicamento = async (formData) => {
	try {
		return await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/medicamentos`,
			formData
		);
	} catch (e) {
		throw e;
	}
};
export const salvarFarmacia = async (formData) => {
	try {
		return await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/farmacias`,
			formData
		);
	} catch (e) {
		throw e;
	}
};


export const listaEstoque = async (cnpj,page,pageSize) => {
	try {
		return await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/farmacias/${cnpj}/estoque?page=${page}&size=${pageSize}`,
			cnpj);
	} catch (e) {
		throw e;
	}
};

export const listarFarmaciaCnpj = async (cnpj) => {
	try {
		return await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/farmacias/${cnpj}`,
			cnpj);
	} catch (e) {
		throw e;
	}
};

export const listarMedicamentos = async (page = 0, pageSize = 10) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/medicamentos?page=${page}&size=${pageSize}`;

  try {
    const response = await axios.get(url);
		
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const transferirMedicamento = async (formData) => {
    try {
        const cnpjOrigem = parseInt(formData.cnpjOrigem);
        const cnpjDestino = parseInt(formData.cnpjDestino);
        const nroRegistro = parseInt(formData.nroRegistro);
        const quantidade = parseInt(formData.quantidade);

        const url = `${import.meta.env.VITE_API_BASE_URL}/farmacias/${cnpjDestino}/estoque/troca`;

        const requestData = {
            cnpjOrigem: cnpjOrigem,
            cnpjDestino: cnpjDestino, 
            nroRegistro: nroRegistro,
            quantidade: quantidade
        };
        console.log('Dados a serem enviados:', requestData); 

        return await axios.put(url, requestData);
    } catch (error) {
        throw error;
    }
};

export const paginacaoMedicamentosInfo = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/medicamentos`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const infos = {
      totalPaginas: data.totalPages,
      totalItem: data.totalElements,
    };
    return infos;
  } catch (error) {
    throw error;
  }
};