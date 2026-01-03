const ErrorMessage = ({ error, 'data-testid': dataTestid }: { error?: string | null | any, 'data-testid'?: string }) => {
  if (!error) {
    return null
  }

  // Eğer error bir obje ise ve string değilse, güvenli bir şekilde işle veya gösterme
  const errorMessage = typeof error === 'string' ? error : (error.message || error.toString())

  // Eğer toString [object Object] döndürüyorsa ve message yoksa, gösterme
  if (errorMessage === '[object Object]') return null

  return (
    <div className="pt-2 text-rose-500 text-small-regular" data-testid={dataTestid}>
      <span>{errorMessage}</span>
    </div>
  )
}

export default ErrorMessage
