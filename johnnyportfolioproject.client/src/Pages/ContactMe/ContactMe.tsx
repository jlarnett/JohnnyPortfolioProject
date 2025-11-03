import axios from 'axios'
import { useNavigate } from 'react-router'
import { SubmitHandler, useForm } from 'react-hook-form'

function ContactMePage() {
    const navigate = useNavigate();

    type ContactRequest = {
        id: number;
        name: string;
        emailAddress: string;
        message: string;
        importance: string;
        urgency: string;
    }

    const { register, handleSubmit, formState: {errors}  }  = useForm<ContactRequest>();

    const onSubmit: SubmitHandler<ContactRequest> = (data) => {
        const environment = process.env.NODE_ENV;
        let baseUrl = ''
        const apiUrl = '/api/ContactRequests'

        if (environment == 'development') {
            baseUrl = 'https://localhost:7009';
        }

        let finalUrl = baseUrl + apiUrl;

        axios.post(finalUrl, data, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                accept: 'application/json'
            }
        }).then(function (data) {
            console.log(data);
            navigate('/');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form className="justify-center items-center md:ms-50 md:me-50" id="ContactRequestForm" onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-center sr-only">Contact Johnny Arnett Form</h1>
          <div className="flex flex-wrap -mx-3 mb-6 content-center md:flex md:justify-center mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="contactNameInput">
                Your Name
              </label>
                    <input {...register('name', {
                        required: 'Name is required',
                    })} 
                    className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 dark:focus:bg-zinc-700 dark:focus:border-green-400 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Jane" data-testid='ContactName'/>
                    {errors.name && (<div className='text-red-700' data-testid='ContactNameValidation'>{errors.name.message}</div>)}
              {/*<p className="text-red-500 text-xs italic">Please fill out this field.</p>*/}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="contactEmailInput">
                Your Email Address
              </label>
                    <input {...register('emailAddress', {
                        required: 'Email Address is required',
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    }) } className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 dark:focus:bg-zinc-700 dark:focus:border-green-400 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="test@email.com" data-testid='ContactEmail'/>
                    {errors.emailAddress && (<div className='text-red-700' data-testid='ContactEmailValidation'>{errors.emailAddress.message}</div>)}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="contactMessageInput">
                Your message or reason for contacting me
              </label>
                    <textarea {...register('message', {
                        required: 'Message is required'
                    }) }  className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-zinc-700 dark:focus:border-green-400 focus:border-gray-800 min-h-72" placeholder="Reason for contacting Johnny Arnett" data-testid='ContactMessage'/>
                    {errors.message && (<div className='text-red-700' data-testid='ContactMessageValidation'>{errors.message.message}</div>)}
              <p className="text-gray-600 dark:text-white text-xs italic">Please make the message as long and detailed as possible. Vague messages are more likely to be filtered out or skipped. Thank You</p>
            </div>
          </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 justify-between">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="contactImportanceInput">
                Importance
              </label>
              <div className="relative">
                        <select 
                        id="contactImportanceInput"
                        {...register('importance', {
                            required: true,
                            minLength: 2,
                        }) } className="block appearance-none dark:bg-zinc-800 dark:text-white w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight dark:focus:bg-zinc-700 focus:outline-none focus:bg-white dark:focus:border-green-400  focus:border-gray-500" data-testid='ContactImportance'>
                  <option>Minor</option>
                  <option>Major</option>
                  <option>Critical</option>
                  <option>Life or Death</option>
                </select>
                {errors.importance && (<div className='text-red-700' data-testid='ContactImportanceValidation'>{errors.importance.message}</div>)}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="contactUrgencyInput">
            Urgency
          </label>
          <div className="relative">
                        <select 
                        id = "contactUrgencyInput"
                        {...register('urgency', {
                            required: true,
                            minLength: 2,
                        }) } className="block appearance-none dark:bg-zinc-800 dark:text-white w-full bg-gray-200 dark:bg-gray-800 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none dark:focus:border-green-400 focus:bg-white dark:focus:bg-zinc-700 focus:border-gray-500" data-testid='ContactUrgency'>
              <option>Relaxed (1 Month+)</option>
              <option>Urgent (1 Week)</option>
              <option>Now (Today)</option>
            </select>
            {errors.urgency && (<div className='text-red-700' data-testid='ContactUrgencyValidation'>{errors.urgency.message}</div>)}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
            <div className="w-full px-3 mt-2">
              <input className="hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full" value="Send Message" type="submit" data-testid='ContactSubmit'/>
            </div>
          </div>
            <div className="flex flex-wrap -mx-3 mb-2">
          </div>
        </form>
    );

}

export default ContactMePage;