export const EnsureMissingDays = (newDate:string, currentDate:string) => {
  const newDeliveryDate = Math.floor(new Date(newDate).getTime()/60000)
  const createdDate = Math.floor(new Date(currentDate).getTime()/60000)
  const missingDays =  Math.floor(Math.floor(newDeliveryDate - createdDate) / 1440)

  const newDeliveryHour = new Date(newDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[1].slice(0,5)
  const newDeliveryTime = missingDays <= 1 ? `1º dia às ${newDeliveryHour}` : `${missingDays}º dia às ${newDeliveryHour}`

  return newDeliveryTime
}
