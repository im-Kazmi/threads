
const handleClickOutside = (ref,setState,e) => {
  if(ref?.current && !ref?.current?.contains(e.target)){
    setState(false)
  }
}

export default handleClickOutside