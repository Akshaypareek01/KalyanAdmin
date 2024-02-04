/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import { useNavigate,Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Cookies from 'js-cookie';

const loginSchema = Yup.object().shape({
  number: Yup.string()
    .required('number is required'),
  password: Yup.string()
    .required('Password is required'),
})

const initialValues = {
  number: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()


  const handelDashboard =()=>{
    // var AuthValue = localStorage.getItem("authValue");
    const AuthValue = sessionStorage.getItem("authValue");
    const user=JSON.parse(sessionStorage.getItem('User')) || null;
    console.log("storedAuthValue",AuthValue)
    if(user && user !== null){
      if(AuthValue === 'true'){
        // window.location.reload();
        navigate("/dashboard");
        console.log("hii from navigate")
      }
      else{
        navigate("/auth");
      }
    }
    else{
      // navigate("/error/404");
      console.log("Error in login .jsx+")
    }
    
  }



  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: userData} = await login(values.number, values.password)
        saveAuth(userData)
        console.log("userdata after Login====>",userData);
        // const {data: user} = await getUserByToken(auth.api_token)
        // const user=
        
        if(userData && userData !== null){
          setCurrentUser(userData.user);
          localStorage.setItem("authValue", "true");
          localStorage.setItem("User",JSON.stringify(userData.user));
          localStorage.setItem("token",JSON.stringify(userData.access_token));
          sessionStorage.setItem("authValue", "true");
          sessionStorage.setItem('User', JSON.stringify(userData.user));
          sessionStorage.setItem('token',userData.access_token);
          // expires in 7 days
          
           setLoading(false)
            window.location.reload();
        }
        else{
            setStatus('The login details are incorrect')
            // localStorage.setItem("authValue", "false");
            sessionStorage.setItem('authValue', 'false');
            setSubmitting(false)
          setLoading(false)
          }
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
 
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        {/* <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div> */}
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}

{/* Googel and number lofin part */}

      {/* <div className='row g-3 mb-9'>
        
        <div className='col-md-6'>
          
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            />
            Sign in with Google
          </a>
         
        </div>
        

        <div className='col-md-6'>
        
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            />
            Sign in with Apple
          </a>
          
        </div>
     
      </div> */}
      

      {/* <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with number</span>
      </div> */}
      {/* end::Separator */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>1234567890</strong> and password <strong>1234</strong> to
            continue.
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Mobile Number</label>
        <input
          placeholder='Mobile Number'
          {...formik.getFieldProps('number')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.number && formik.errors.number},
            {
              'is-valid': formik.touched.number && !formik.errors.number,
            }
          )}
          type='text'
          name='number'
          autoComplete='off'
        />
        {formik.touched.number && formik.errors.number && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.number}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          
          placeholder='Password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        {/* <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link> */}
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
          onClick={handelDashboard}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

      </div>
      {/* end::Action */}
    </form>
  )
}
