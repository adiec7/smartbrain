import React from 'react';
import {css} from 'react-emotion';
import {CircleLoader} from 'react-spinners';
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange, onButtonSubmit, onFileChange, loading, uploadState, invalid}) => {

	const override = css`
	display: inline;
    margin: 0 30px;
    border-color: red;
	`

	return (
		<div>
			<p className = 'info'>
				{'This Magic Brain will analyse faces in your pictures. Try it'}
			</p>
			<div className='center'>
			<div className="form">
				<div className='entry-form'>
					<div className='form_select'>
						<label >
							<input type="file" style={{display: "none"}} onChange={onFileChange}/>
							 Choose an Image
						</label>
					</div>
					<div className='text_input'>
						<h4>Or Enter an Image Url below and click detect</h4>
						<input type='text' onChange = {onInputChange}/>
						{invalid? <h5>enter a valid image link</h5> : null}
					</div>	
				</div>
				<button className='' onClick = {onButtonSubmit}>Detect</button>
				{loading?
				<div className='sweeet-loading' id='spinner'>
					{uploadState+'...'}
					<CircleLoader 
						className={override}
						sizeUnit={'px'}
						size={50}
						color={'gold'}
						loading={loading}
						/>
				</div>:
				null
				}
			</div>
			</div>
		</div>
		);
}
export default  ImageLinkForm;