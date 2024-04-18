import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { MainStyled } from '../../components/Main';
import EnhancedTable from '../../components/TabelaEstoque';
import { listaEstoque, listarFarmaciaCnpj } from '../../services/api';
import { errorNotification, successNotification } from '../../services/notification';
import { TablePagination, Grid, Card, CardContent, Typography, Box } from '@mui/material';

function EstoqueFarmacia() {
	const { cnpj } = useParams();
	const [estoque, setEstoque] = useState([]);
	const [farmacia, setFarmacia] = useState({});
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseEstoque = await listaEstoque(cnpj, page, rowsPerPage);
				const responseFarmacia = await listarFarmaciaCnpj(cnpj);

				if (responseEstoque.data.content.length > 0) {
					setEstoque(responseEstoque.data.content);
					setFarmacia(responseFarmacia.data);
					successNotification('Estoque carregado com sucesso!');
				} else {
					throw new Error('O estoque está vazio!');
				}
			} catch (error) {
				errorNotification(`Erro: Estoque inexistente!`);
			}
		};

		fetchData();
	}, [cnpj, page, rowsPerPage]);

	const endereco = farmacia.endereco ? `${farmacia.endereco.cidade}/${farmacia.endereco.estado}/${farmacia.endereco.bairro}` : null;

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Header />
				<Grid item xs={12} md={12} lg={12}>
					<Card style={{ padding: '5px', margin: '5px', width: '100vw', height: '100vh', overflow: 'auto' }}>
						<CardContent>
							<EnhancedTable page={page} rowsPerPage={rowsPerPage} estoque={estoque} farmacia={farmacia} endereco={endereco} />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export default EstoqueFarmacia;
