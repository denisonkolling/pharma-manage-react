import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import VendaMedicamento from '../pages/VendaMedicamento';
import Login from '../pages/Login';
import { Farmacias } from '../pages/Farmacias';
import AquisicaoMedicamento from '../pages/AquisicaoMedicamento';
import CadastroMedicamento from '../pages/CadastroMedicamento';
import EsqueciSenha from '../pages/EsqueciSenha';
import CadastroFarmacia from '../pages/CadastroFarmacia';
import EstoqueFarmacia from '../pages/EstoqueFarmacia';
import Medicamentos from '../pages/Medicamentos';
function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/esqueci-senha" element={<EsqueciSenha />} />
				<Route path="/" element={<Login />} />
				<Route path="/venda-medicamento" element={<VendaMedicamento />} />
				<Route path="/produto/detalhamento" element={<Medicamentos />} />
				<Route path="/produto/transferencia" element={<Medicamentos />} />
				<Route path="/empresa/listagem" element={<Farmacias />} />
				<Route path="/aquisicao-medicamento" element={<AquisicaoMedicamento />} />
				<Route path="/produto/cadastro" element={<CadastroMedicamento />} />
				<Route path="/empresa/cadastro" element={<CadastroFarmacia />} />
				<Route path="/empresa/:cnpj/estoque" element={<EstoqueFarmacia />} />
			</Routes>
		</BrowserRouter>
	);
}

export { RoutesApp };
