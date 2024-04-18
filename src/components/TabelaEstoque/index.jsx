import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colors } from '@mui/material';
import { Typography } from '@mui/material';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'nroRegistro',
		numeric: false,
		disablePadding: true,
		label: 'Numero do Registro',
	},
	{
		id: 'nome',
		numeric: false,
		disablePadding: true,
		label: 'Nome',
	},
	{
		id: 'quantidade',
		numeric: true,
		disablePadding: false,
		label: 'Quantidade',
	},
	{
		id: 'dataAtualizacao',
		numeric: true,
		disablePadding: true,
		label: 'Data Atualizacao',
	},
];
function EnhancedTableHead(props) {
	const { nomeFantasia, razaoSocial, cnpj, endereco } = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ width: '100%' }}>
			<TableRow>
				<TableCell colSpan={4}>
					<Typography variant="h4" gutterBottom align="center">
						Estoque de Farmácia
					</Typography>
					<Typography variant="h6">
						Razão Social: <span>{razaoSocial}</span>
					</Typography>
					<Typography variant="h6">
						CNPJ: <span>{cnpj}</span>
					</Typography>
					<Typography variant="h6">
						Endereço: <span>{endereco}</span>
					</Typography>
				</TableCell>
			</TableRow>
			<TableRow>
				{headCells.map((column) => (
					<TableCell key={column.id} align="center" style={{ top: 57, minWidth: column.minWidth }}>
						<span style={{ color: '#9370DB' }}>{column.label}</span>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function EnhancedTable(props) {
	const { farmacia, endereco } = props;

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.estoque.length) : 0;

	const visibleRows = React.useMemo(
		() => stableSort(props.estoque, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, props.estoque]
	);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR');
	};

	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<Paper
				sx={{
					borderRadius: 2,
					border: 1,
					mt: 1,
					boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
					width: '100%',
					overflow: 'hidden',
					color: '#cab6fa',
				}}>
				<TableContainer sx={{ height: '100%', overflow: 'auto' }}>
					<Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} sx={{ minWidth: 650 }}>
						<EnhancedTableHead
							onRequestSort={handleRequestSort}
							nomeFantasia={farmacia.nomeFantasia}
							razaoSocial={farmacia.razaoSocial}
							cnpj={farmacia.cnpj}
							endereco={endereco}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.nroRegistro}
										selected={isSelected(row.nroRegistro)}
										sx={{
											cursor: 'pointer',
										}}>
										<TableCell component="th" id={labelId} scope="row" align="center" padding="none">
											{row.nroRegistro}
										</TableCell>
										<TableCell align="center">{row.nome}</TableCell>
										<TableCell align="center">{row.quantidade}</TableCell>
										<TableCell align="center">{formatDate(row.dataAtualizacao)}</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					labelRowsPerPage="Linhas por página"
					component="div"
					count={props.estoque.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
