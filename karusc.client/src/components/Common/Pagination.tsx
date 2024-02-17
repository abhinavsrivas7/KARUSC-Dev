import { Button, Container } from "react-bootstrap";

type PaginationData = {
    currentPage: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
}


export const Pagination = (paginationData: PaginationData) => {
    const handlePageChange = (newPage: number) => {
        paginationData.onPageChange(newPage);
    };

    return <>
        <Container className="me-auto">
               <Button
                    className="admin-button mb-4"
                    variant="pink"
                    size="lg"
                    style={{ minWidth: '110px' }}
                    disabled={paginationData.currentPage < 1}
                    onClick={() => handlePageChange(paginationData.currentPage - 1)} >
                    Previous
                </Button>
        </Container>
        <Container className="ms-auto d-flex justify-content-end">
                <Button
                    className="admin-button mb-4"
                    variant="pink"
                    size="lg"
                    style={{ minWidth: '110px' }}
                    disabled={paginationData.currentPage > paginationData.totalCount - 1}
                    onClick={() => handlePageChange(paginationData.currentPage + 1)} >
                    Next
                </Button>
        </Container>
    </>;
};