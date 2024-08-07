const NewProduct = () => {
   return (
      <div className='page-wrapper'>
         <div className='page-breadcrumb'>
            <div className='row'>
               <form style={{ width: "50%", marginLeft: "40px" }}>
                  <div className='form-group'>
                     <label>Product Name</label>
                     <input type='text' className='form-control' placeholder='Enter Product Name' />
                  </div>
                  <div className='form-group'>
                     <label>Category</label>
                     <input type='text' className='form-control' placeholder='Enter Category' />
                  </div>
                  <div className='form-group'>
                     <label>Short Description</label>
                     <textarea className='form-control' rows='3' placeholder='Enter Short Description'></textarea>
                  </div>
                  <div className='form-group'>
                     <label>Long Description</label>
                     <textarea className='form-control' rows='6' placeholder='Enter Long Description'></textarea>
                  </div>
                  <div className='form-group'>
                     <label for='exampleFormControlFile1'>Upload image (5 images)</label>
                     <input type='file' className='form-control-file' id='exampleFormControlFile1' multiple />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default NewProduct;
