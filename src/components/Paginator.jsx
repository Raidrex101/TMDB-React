
const Paginator = ({page, onPageChange }) => {
    

    const previousPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    }

    const nextPage = () => {
            onPageChange(page + 1);
    }


    return (
        <nav aria-label="Page navigation example">

            <ul className="pagination justify-content-center">

                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>

                    <button className="page-link" onClick={previousPage}>Previous</button></li>

                <li className="page-item"><button className="page-link">{page}</button></li>

                <li className="page-item">

                    <button className="page-link" onClick={nextPage}>Next</button></li>
            </ul>
        </nav>
    )
}

export default Paginator