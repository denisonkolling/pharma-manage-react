import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successNotification = (mensagem) => {
    toast.success(mensagem);
}

export const errorNotification = (mensagem) => {
    toast.error(mensagem);
}