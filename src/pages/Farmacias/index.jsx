import * as React from 'react';
import { useEffect, useState } from 'react';
import { CardStyled } from '../../components/CardFarmacia';
import Header from '../../components/Header';
import Pesquisar from '../../components/Pesquisar';
import { listarFarmacias, paginacaoFarmaciaInfo } from '../../services/api';
import { TablePagination, Grid, Card, CardContent, Typography, Box } from '@mui/material';

function Farmacias() {
	const [farmacias, setFarmacias] = useState([]);
	const [termoPesquisa, setTermoPesquisa] = useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [totalPaginas, setTotalPaginas] = React.useState(0);
	const [totalItem, setTotalItem] = React.useState(0);

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
				const response = await listarFarmacias(page, rowsPerPage);
				const farmaciasAdaptadas = response.content.map((item) => ({
					id: item.id,
					nomeFantasia: item.nomeFantasia,
					cnpj: item.cnpj,
					razaoSocial: item.razaoSocial,
					endereco: `${item.endereco.cidade}/${item.endereco.estado}`,
					latitude: item.endereco.latitude,
					longitude: item.endereco.longitude,
				}));
				setFarmacias(farmaciasAdaptadas);
			} catch (error) {
				console.error('Erro ao buscar farmácias:', error);
			}
		};

		fetchData();
	}, [page, rowsPerPage]);

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				const response = await paginacaoFarmaciaInfo();
				setTotalPaginas(response.totalPaginas);
				setTotalItem(response.totalItem);
			} catch (error) {
				console.error('Erro ao buscar informações de paginação:', error);
			}
		};

		fetchInfo();
	}, []);

	const farmaciasFiltradas = farmacias.filter((farmacia) => {
		const nomeLowerCase = farmacia.nomeFantasia.toLowerCase();
		const cnpj = farmacia.cnpj.toString();
		const termoPesquisaLowerCase = termoPesquisa.toLowerCase();
		return nomeLowerCase.includes(termoPesquisaLowerCase) || cnpj.includes(termoPesquisa);
	});

	const farmaciasCards = farmaciasFiltradas.map((farmacia) => (
		<CardStyled
			key={farmacia.cnpj}
			nomeFantasia={farmacia.nomeFantasia}
			cnpj={farmacia.cnpj}
			razao_social={farmacia.razaoSocial}
			cidade={farmacia.endereco}
			latitude={farmacia.latitude}
			longitude={farmacia.longitude}
		/>
	));

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Header />
				<Grid item xs={12} md={12} lg={12}>
					<Card style={{ padding: '5px', margin: '5px', width: 'auto', minHeight: '100vh' }}>
						<CardContent>
							<Typography variant="h5" gutterBottom align="center">
								Listagem de Farmácias
							</Typography>

							<Pesquisar onPesquisa={(termo) => setTermoPesquisa(termo)} />

							<Box p={2}>
								<Grid container justifyContent="center" alignItems="center">
									{farmaciasCards}
								</Grid>
							</Box>
							<TablePagination
								component="div"
								count={totalItem}
								page={page}
								onPageChange={handleChangePage}
								rowsPerPage={rowsPerPage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								labelRowsPerPage="Itens por página"
								sx={{ display: 'flex', justifyContent: 'center' }}
							/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export { Farmacias };
