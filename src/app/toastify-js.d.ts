declare module 'toastify-js' {
    interface ToastifyOptions {
      text?: string;
      duration?: number;
      gravity?: 'top' | 'bottom'; // Top o Bottom
      position?: 'left' | 'center' | 'right'; // Izquierda, Centro o Derecha
      backgroundColor?: string;
      close?: boolean;
      stopOnFocus?: boolean;
    }
  
    class Toastify {
      constructor(options: ToastifyOptions);
      showToast(): void;
    }
  
    export default Toastify;
  }
  