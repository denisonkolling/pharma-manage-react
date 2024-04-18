import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Box from '@mui/material/Box';
import MedicamentosLista from '../../components/ListaMedicamentos';
import DetalhesMedicamentoModal from '../../components/ModalDetalhesMedicamento';
import TransferirMedicamentoModal from '../../components/ModalTransferirMedicamento';
import { listarMedicamentos, paginacaoMedicamentosInfo } from '../../services/api';
import { TextField, Grid, Card, CardContent, Typography } from '@mui/material';

const Medicamentos = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedMedicamento, setSelectedMedicamento] = useState(null);
	const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
	const [modalTransferirOpen, setModalTransferirOpen] = useState(false);
	const [medicamentos, setMedicamentos] = useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(6);
	const [totalPaginas, setTotalPaginas] = React.useState(0);
	const [totalItem, setTotalItem] = React.useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await listarMedicamentos(page, rowsPerPage);
				setMedicamentos(data.content);
			} catch (error) {
				console.error('Erro ao buscar medicamentos:', error);
			}
		}
		fetchData();
	}, [page, rowsPerPage]);

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				const response = await paginacaoMedicamentosInfo();
				setTotalPaginas(response.totalPaginas);
				setTotalItem(response.totalItem);
			} catch (error) {
				console.error('Erro ao buscar informações de paginação:', error);
			}
		};

		fetchInfo();
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleOpenDetalhesModal = (medicamento) => {
		setSelectedMedicamento(medicamento);
		setModalDetalhesOpen(true);
	};

	const handleCloseDetalhesModal = () => {
		setModalDetalhesOpen(false);
	};

	const handleOpenTransferirModal = (medicamento) => {
		setSelectedMedicamento(medicamento);
		setModalTransferirOpen(true);
	};

	const handleCloseTransferirModal = () => {
		setModalTransferirOpen(false);
	};

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Header />
				<Grid container xs={12} md={12} lg={12}>
					<Card style={{ padding: '5px', margin: '5px', width: '100vw', minHeight: '100vh'}}>
						<CardContent>
							<Typography variant="h5" gutterBottom align="center">
								Listagem de Medicamentos
							</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									maxWidth: '500',
								}}
								component="form"
								noValidate
								autoComplete="off">
								<TextField
									id="standard-search"
									label="Pesquisar Medicamento"
									type="search"
									variant="standard"
									color="secondary"
									sx={{ width: '50%', marginBottom: '10px' }}
									onChange={handleSearch}
								/>
								<MedicamentosLista
									dados={medicamentos}
									totalPaginas={totalPaginas}
									totalItem={totalItem}
									page={page}
									onPageChange={handleChangePage}
									rowsPerPage={rowsPerPage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									searchTerm={searchTerm}
									handleOpenDetalhesModal={handleOpenDetalhesModal}
									handleOpenTransferirModal={handleOpenTransferirModal}
								/>
							</Box>
							{selectedMedicamento && (
								<DetalhesMedicamentoModal open={modalDetalhesOpen} onClose={handleCloseDetalhesModal} medicamento={selectedMedicamento} />
							)}
							{selectedMedicamento && (
								<TransferirMedicamentoModal open={modalTransferirOpen} onClose={handleCloseTransferirModal} medicamento={selectedMedicamento} />
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default Medicamentos;
