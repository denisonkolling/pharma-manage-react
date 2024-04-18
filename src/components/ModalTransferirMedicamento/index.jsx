import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { transferirMedicamento } from '../../services/api';
import { aquisicaoMedicamento } from '../../services/api';
import { successNotification, errorNotification } from '../../services/notification';

function TransferirMedicamentoModal({ open, onClose }) {
	const [transferData, setTransferData] = useState({
		cnpjDestino: '',
		cnpjOrigem: '',
		nroRegistro: '',
		quantidade: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchEstoque() {
			try {
				const quantidade = await aquisicaoMedicamento(transferData.nroRegistro);
				setTransferData((prevData) => ({ ...prevData, quantidade }));
			} catch (error) {
				console.error('Erro ao buscar quantidade do estoque:', error);
			}
		}

		if (transferData.nroRegistro) {
			fetchEstoque();
		}
	}, [transferData.nroRegistro]);

	const handleTransferDataChange = (e) => {
		const { name, value } = e.target;
		setTransferData({ ...transferData, [name]: value });
	};

	const handleTransferSubmit = async () => {
		try {
			setIsLoading(true);
			const response = await transferirMedicamento(transferData);
			setIsLoading(false);
			onClose();
			successNotification('Medicamento transferido com sucesso!');
			cleanForm();
		} catch (error) {
			setError(error);
			errorNotification('Erro ' + error.response.data.titulo + ' ' + error.response.data.mensagem);
			setIsLoading(false);
		}
	};

	const cleanForm = () => {
		setTransferData({
			cnpjDestino: '',
			cnpjOrigem: '',
			nroRegistro: '',
			quantidade: '',
		});
	};

	return (
		<>
			<Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: '8px',
					}}>
					<Typography id="modal-title" variant="h6" component="h2" align="center" gutterBottom>
						Transferir Medicamento
					</Typography>
					<Typography id="modal-description" variant="body1" align="center" gutterBottom>
						Preencha os campos abaixo para transferir o medicamento entre farmácias:
					</Typography>
					<TextField
						fullWidth
						label="CNPJ de Destino"
						name="cnpjDestino"
						value={transferData.cnpjDestino}
						onChange={handleTransferDataChange}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="CNPJ de Origem"
						name="cnpjOrigem"
						value={transferData.cnpjOrigem}
						onChange={handleTransferDataChange}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Número do Registro"
						name="nroRegistro"
						value={transferData.nroRegistro}
						onChange={handleTransferDataChange}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Quantidade"
						name="quantidade"
						value={transferData.quantidade}
						onChange={handleTransferDataChange}
						margin="normal"
						variant="outlined"
					/>
					<Button
						fullWidth
						variant="contained"
						style={{ backgroundColor: '#7E57C2', color: 'white', marginTop: '16px' }}
						onClick={handleTransferSubmit}
						disabled={isLoading}>
						{isLoading ? 'Transferindo...' : 'Transferir'}
					</Button>
				</Box>
			</Modal>
		</>
	);
}

export default TransferirMedicamentoModal;
