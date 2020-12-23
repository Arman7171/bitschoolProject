import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Route } from 'react-router-dom';
import Routes from './Routes';
import Header from './Components/header';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Components/Spinner/Spinner';

class App extends React.PureComponent{
  
  componentDidUpdate(){
    const { errorMessage, successMessage } = this.props;
    if(errorMessage){
      toast.error(errorMessage);
    }
    if(successMessage){
      toast.success(successMessage);
    }
  }

  render(){
  
    const { loading } = this.props;

    return (
      <div className="App">
        <Route>
          <Header />
          <Routes />
        </Route>
  
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {
            loading && <Spinner /> 
          }
      </div>
    );
  }
 
}

const mapStateToProps = (state) => {
  return{
    errorMessage: state.error,
    successMessage: state.successMessage,
    loading: state.loading,
  }
}

export default connect(mapStateToProps, null)(App);
