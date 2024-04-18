import React, { useState } from 'react';
import DetalhesMedicamentoModal from '../ModalDetalhesMedicamento';
import { Card, TablePagination } from '@mui/material';
import CustomButton from '../../components/Button/CustomButton';
import { Box, Typography, Button, Grid } from '@mui/material';

const MedicamentosLista = ({
	searchTerm,
	dados,
	handleOpenModal,
	handleOpenTransferirModal,
	totalPaginas,
	totalItem,
	page,
	onPageChange,
	rowsPerPage,
	onRowsPerPageChange,
	...props
}) => {
	const [selectedMedicamento, setSelectedMedicamento] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const filteredMedicamentos = dados.filter((medicamento) => medicamento.nome.toLowerCase().includes(searchTerm.toLowerCase()));

	const handleOpenDetalhesModal = (medicamento) => {
		setSelectedMedicamento(medicamento);
		setOpenModal(true);
	};

	const handleCloseDetalhesModal = () => {
		setOpenModal(false);
	};

	const defaultImageUrl =
		'https://cdn.sistemawbuy.com.br/arquivos/1eca73799a8b499624e5d656646e7ef5/produtos/POU5VIO4/caneca-anestesia-cafe-generico-coffee-medicamento-remedio-paralelo-medicine-medicina-enfermagem-anestesico-ver-63ada5714269f.jpg';

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: '15px',
					margin: '5px',
					fontFamily: 'Arial, sans-serif',
				}}>
				{filteredMedicamentos.map((medicamento) => (
					<>
						<Card
							key={medicamento.nroRegistro}
							style={{
								width: 'calc(20% - 80px)',
								padding: '5px',
								borderRadius: '5px',
								boxShadow: '0 1px 200px rgba(0,0,0,0.15)',
								minWidth: '290px',
							}}>
							<Box p={2}>
								<Grid container direction="column" spacing={2}>
									<Grid item xs={12}>
										<img src={medicamento.imagemUrl || defaultImageUrl} alt={medicamento.nome} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
									</Grid>
									<Grid item xs={12}>
										<Typography variant="body2">
											<strong>Registro:</strong> {medicamento.nroRegistro}
										</Typography>
										<Typography variant="body2">
											<strong>Nome:</strong> {medicamento.nome}
										</Typography>
										<Typography variant="body2">
											<strong>Laboratório:</strong> {medicamento.laboratorio}
										</Typography>
										<Typography variant="body2">
											<strong>Preço:</strong> R$ {medicamento.preco}
										</Typography>
										<Typography variant="body2">
											<strong>Tipo:</strong> {medicamento.tipo}
										</Typography>
									</Grid>
									<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', gap: '10px' }}>
										<Button variant="contained" onClick={() => handleOpenDetalhesModal(medicamento)}>
											Detalhes
										</Button>
										<Button variant="contained" onClick={() => handleOpenTransferirModal(medicamento)}>
											Transferir
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Card>
					</>
				))}
				{openModal && selectedMedicamento && <DetalhesMedicamentoModal open={openModal} onClose={handleCloseDetalhesModal} medicamento={selectedMedicamento} />}
			</div>
			<div>
				<TablePagination
					component="div"
					count={totalItem}
					page={page}
					onPageChange={onPageChange}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={onRowsPerPageChange}
					labelRowsPerPage="Itens por página"
					sx={{ display: 'flex', justifyContent: 'center' }}
				/>
			</div>
		</div>
	);
};

export default MedicamentosLista;
