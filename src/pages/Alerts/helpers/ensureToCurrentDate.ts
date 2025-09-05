export const EnsureToCurrentDate = (date:string) => {
  const createdDate = new Date(date)
  const nowDate = new Date();

  const createdMins = Math.floor(createdDate.getTime()/60000)
  const nowMins = Math.floor(nowDate.getTime()/60000)

  const standingMins = Math.floor(nowMins - createdMins)

  //Ternary operator w 3 verifications: min, horas ou dias
  const NewDate = standingMins < 60 ?
    `Há ${standingMins} min`
  :
  standingMins > 1440 ?
    `Há ${Math.floor(standingMins/1440)} dia(s)`
  :
    `Há ${Math.floor(standingMins/60)} hora(s)`

  return NewDate
}
