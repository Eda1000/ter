export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const dateMask = (value: string) => {
  const dateObj = new Date(value);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${day}/${month}/${year}`;
}

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const onlyNumberMask = (value: string) => {
  return value
    .replace(/\D/g, '');
};

export const phoneNumberMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)$/, "$1");
};

export const bankAgencyMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1')
};

export const removeCepMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{8})(\d)/, '$1')
};

export const removeCnpjMask = (value: string) => {
  return value.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');
}

export const removeCpfMask = (value: string) => {
  return value.replaceAll('.', '').replaceAll('-', '')  ;
}

export const removePhoneNumberMask = (value: string) => {
  return value.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
}

export const maskCep = (value: string) => {
  return value.replace(/[^0-9]/g, '').replace(/^(\d{5})(\d{3})$.*/, '$1-$2');
};

export const removeMaskCep = (value: string) => {
  return value.replace('-', '').replace('.', '').trim();
};
