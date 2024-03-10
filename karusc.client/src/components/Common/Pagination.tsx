import { Button, Stack } from "react-bootstrap";

type PaginationData = {
    currentPage: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
}


export const Pagination = (paginationData: PaginationData) => {
    const handlePageChange = (newPage: number) => {
        paginationData.onPageChange(newPage);
    };

    return <Stack direction="horizontal" className="my-4 px-0" style={{ width: '100%' }}>
        <div
            style={{ width: '40%' }}
            className="d-flex justify-content-center align-items-center">
               <Button
                    className="admin-button"
                    variant="pink"
                    size="lg"
                    style={{ minWidth: '110px' }}
                    disabled={paginationData.currentPage < 1}
                    onClick={() => handlePageChange(paginationData.currentPage - 1)} >
                    Previous
                </Button>
        </div>
        <span style={{width: '50%'}}></span>
        <div
            style={{ width: '40%' }}
            className="d-flex justify-content-center align-items-center">
                <Button
                    className="admin-button"
                    variant="pink"
                    size="lg"
                    style={{ minWidth: '110px' }}
                    disabled={paginationData.currentPage > paginationData.totalCount - 1}
                    onClick={() => handlePageChange(paginationData.currentPage + 1)} >
                    Next
                </Button>
        </div>
    </Stack>;
};