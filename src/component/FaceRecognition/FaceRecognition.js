import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, faces, loaded}) => {
	let color = ['red', 'yellow', 'blue', 'black', 'cyan','purple','deeppink','orangered','rgb(153, 196, 67)']
return(
	<div className =''> 
	  <div className = 'face_image'>
	    <img id = 'inputImage' alt= '' src = {imageUrl}/>
			{faces.map((face,i)=>{
				return (
					<div key = {i} className='bounding-box' 
								style = {{ top: face.topRow,
													 right: face.rightCol, 
													 bottom: face.bottomRow, 
													 left: face.leftCol,
													 border:`solid 2px ${color[i]}`}}> </div>
	  			
				)
			})}
	  </div>
		<div>
			<h2>Image Analysis</h2>
			<div id='table' className='table'>
			{
				loaded? faces.length > 0 ?
				<table>
					
					<thead>
						<tr style={{paddingBottom:'10px',fontSize:'22px',fontWeight:'bold'}}>
							<th>Gender</th>
							<th>Category</th>
							<th>Glasses</th>
						</tr>
					</thead>
					
					<tbody>
						{
							faces.map((face,i) =>{
								return(
									<tr key ={i} style={{color: color[i],marginTop:'15px',fontSize:'18px'}}>
										<td>{face.gender}</td>
										<td>{face.minor}</td>
										<td>{face.glasses}</td>
									</tr>
									
								)
							})
						}
					</tbody>	
				</table>
				:<h3>No face detected</h3>
				:<h2>Will show here</h2>
			}
			</div>
			
		</div>
	</div>
	
	)
		}

export default FaceRecognition;
