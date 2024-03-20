function Alert({ message } : any ){
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }

export default Alert