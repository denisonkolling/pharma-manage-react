import { useState } from 'react';
import { 
  TextField, 
  MenuItem, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Typography 
} from '@mui/material';
import Header from '../../components/Header';
import { salvarFarmacia } from '../../services/api';
import { successNotification, errorNotification } from '../../services/notification';

function CadastroFarmacia() {
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [numero, setNumero] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnpjError, setCnpjError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [celular, setCelular] = useState('');
  const [celularError, setCelularError] = useState('');

  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    email: '',
    telefone: [],
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: '',
      latitude: '',
      longitude: '',
    },
  });

  const handleLatitude = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitude = (e) => {
    setLongitude(e.target.value);
  };

  const handleNumero = (e) => {
    setNumero(e.target.value);
  };

  const handleRua = (e) => {
    const ruaValue = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      endereco: {
        ...prevData.endereco,
        logradouro: ruaValue,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    if (parent === 'endereco') {
      setFormData((prevData) => ({
        ...prevData,
        endereco: {
          ...prevData.endereco,
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCep = (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);
    if (!validaCep(cepValue)) {
      setCepError('O formato do CEP deve conter 8 números');
    } else {
      setCepError('');
      const url = `https://viacep.com.br/ws/${cepValue}/json/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            endereco: {
              ...prevData.endereco,
              cep: cepValue,
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            },
          }));
        })
        .catch((error) => console.error('Erro ao obter dados do CEP:', error));
    }
  };

  const validaCep = (cep) => {
    const zipCodeRegex = /^[0-9]{8}$/;
    return zipCodeRegex.test(cep);
  };

  const handleCnpj = (e) => {
    const cnpjValue = e.target.value;
    setCnpj(cnpjValue);
    if (!validaCnpj(cnpjValue)) {
      setCnpjError('O formato do CNPJ deve conter 14 números');
    } else {
      setCnpjError('');
    }
  };

  const validaCnpj = (cnpj) => {
    const cnpjRegex = /^[0-9]{14}$/;
    return cnpjRegex.test(cnpj);
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!validaEmail(emailValue)) {
      setEmailError('O formato do e-mail deve ser válido');
    } else {
      setEmailError('');
    }
  };

  const validaEmail = (email) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email);
  };

  const handleTelefone = (e) => {
    const telefoneValue = e.target.value;
    setTelefone(telefoneValue);
    if (!validaTelefone(telefoneValue)) {
      setTelefoneError('O formato do telefone deve conter 11 números');
    } else {
      setTelefoneError('');
    }
  };

  const validaTelefone = (telefone) => {
    const telefoneRegex = /^[0-9]{11}$/;
    return telefoneRegex.test(telefone);
  };

  const handleCelular = (e) => {
    const celularValue = e.target.value;
    setCelular(celularValue);
    if (!validaCelular(celularValue)) {
      setCelularError('O formato do celular deve conter 11 números');
    } else {
      setCelularError('');
    }
  };

  const validaCelular = (celular) => {
    const celularRegex = /^[0-9]{11}$/;
    return celularRegex.test(celular);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      cnpj: parseInt(cnpj),
      razaoSocial: formData.razaoSocial,
      nomeFantasia: formData.nomeFantasia,
      email: email,
      telefone: telefone,
      endereco: {
        cep: formData.endereco.cep,
        logradouro: formData.endereco.logradouro,
        numero: numero,
        bairro: formData.endereco.bairro,
        cidade: formData.endereco.cidade,
        estado: formData.endereco.estado,
        complemento: formData.endereco.complemento,
        latitude: latitude,
        longitude: longitude,
      },
    };

    salvarFarmacia(dataToSend)
      .then(() => {
        successNotification('Cadastro realizado com sucesso!');
        limparFormulario();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = `Erro ${error.response.data.titulo}: ${error.response.data.mensagem}`;
          errorNotification(errorMessage);
        } else {
          console.error('Erro ao cadastrar farmácia:', error);
        }
      });
  };

  const limparFormulario = () => {
    setCep('');
    setCepError('');
    setLatitude('');
    setLongitude('');
    setNumero('');
    setCnpj('');
    setCnpjError('');
    setEmail('');
    setEmailError('');
    setTelefone('');
    setTelefoneError('');
    setCelular('');
    setCelularError('');
    setFormData({
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      email: '',
      telefone: [],
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        latitude: '',
        longitude: '',
      },
    });
  };

  return (
    <>
      <Header />
      <Grid container justifyContent="center" alignItems="center">
        <Card style={{ padding: '5px', margin: '5px', width: '100vw', height: '100vh' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Cadastro de Farmácia
            </Typography>
            <form onSubmit={handleSubmit} 
            >
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={10} lg={5}>
                <TextField
									fullWidth
									margin="normal"
									onChange={handleCnpj}
									value={cnpj}
									error={Boolean(cnpjError)}
									helperText={cnpjError}
									required
									id="cnpj"
									key="cnpj"
									label="CNPJ"
									name="cnpj"
									color="secondary"
									autoFocus
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={3}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.razaoSocial}
									required
									id="razaoSocial"
									key="razaoSocial"
									label="Razão Social"
									name="razaoSocial"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={3}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.nomeFantasia}
									required
									id="nomeFantasia"
									key="nomeFantasia"
									label="Nome Fantasia"
									name="nomeFantasia"
									color="secondary"
								/>
							</Grid>
							<Grid item xs={12} sm={10} lg={4}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleEmail}
									value={email}
									error={Boolean(emailError)}
									helperText={emailError}
									required
									id="email"
									key="email"
									label="Email"
									name="email"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={3}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleTelefone}
									value={telefone}
									error={Boolean(telefoneError)}
									helperText={telefoneError}
									required
									id="telefone"
									key="telefone"
									label="Telefone"
									name="telefone"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={4}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleCelular}
									value={celular}
									error={Boolean(celularError)}
									helperText={celularError}
									required
									id="celular"
									key="celular"
									label="Celular"
									name="celular"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={2}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleCep}
									value={formData.cep}
									required
									id="cep"
									key="cep"
									label="CEP"
									name="cep"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={6}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleRua}
									value={formData.endereco.logradouro}
									required
									id="rua"
									key="rua"
									label="Rua"
									name="rua"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={3}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleNumero}
									value={numero}
									required
									id="numero"
									key="numero"
									label="Numero"
									name="numero"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={2}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.endereco.bairro}
									required
									id="bairro"
									key="bairro"
									label="Bairro"
									name="endereco.bairro"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={3}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.endereco.cidade}
									required
									id="cidade"
									key="cidade"
									label="Cidade"
									name="endereco.cidade"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={2}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.endereco.estado}
									required
									id="estado"
									key="estado"
									label="Estado"
									name="endereco.estado"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={2}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleChange}
									value={formData.complemento}
									id="complemento"
									key="complemento"
									label="Complemento"
									name="complemento"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={1}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleLatitude}
									value={latitude}
									id="latitude"
									key="latitude"
									label="Latitude"
									name="latitude"
									color="secondary"
								/>
							</Grid>

							<Grid item xs={12} sm={10} lg={1}>
								<TextField
									fullWidth
									margin="normal"
									onChange={handleLongitude}
									value={longitude}
									id="longitude"
									key="longitude"
									label="Longitude"
									name="longitude"
									color="secondary"
								/>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" item>
                <Button variant="contained" type="submit" sx={{ m: 2 }}>
                  Cadastrar Farmácia
                </Button>
                <Button variant="outlined" sx={{ m: 2 }} onClick={limparFormulario}>
                  Cancelar
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default CadastroFarmacia;
