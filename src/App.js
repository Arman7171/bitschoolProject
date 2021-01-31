import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { history } from './helpers/history';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Components/Spinner/Spinner';

class App extends React.PureComponent{
  
  componentDidUpdate(){
    const { errorMessage, successMessage, authErrorMessage, authSuccessMessage } = this.props;
    if(errorMessage){
      toast.error(errorMessage);
    }
    if(successMessage){
      toast.success(successMessage);
    }

    if(authErrorMessage){
      toast.error(authErrorMessage);
    }
    if(authSuccessMessage){
      toast.success(authSuccessMessage);
    }
  }

  render(){
  
    const { loading, authLoading } = this.props;

    return (
      <div className="App">
        <Router history={history}>
          <Header />
          <Routes />
          <Footer />
        </Router>
  
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
            (loading || authLoading) && <Spinner /> 
          }
      </div>
    );
  }
 
}

const mapStateToProps = (state) => {
  return{
    errorMessage: state.taskReducer.error,
    successMessage: state.taskReducer.successMessage,
    authErrorMessage: state.userReducer.error,
    authSuccessMessage: state.userReducer.successMessage,
    loading: state.taskReducer.loading,
    authLoading: state.userReducer.loading
  }
}

export default connect(mapStateToProps, null)(App);
