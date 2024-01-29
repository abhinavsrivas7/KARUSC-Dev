//import React, { useState } from "react";
//import { Form, Table } from "react-bootstrap";

//interface Category {
//    title: string;
//    description: string;
//}

//interface CollectionData {
//    [key: string]: Category[];
//}

export const UpdateCollection = () => {
    //const [selectedCollection, setSelectedCollection] = useState<string>("");

    //const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //    setSelectedCollection(e.target.value);
    //};

    return (
        <div>
            {/*<Form>*/}
            {/*    <Form.Group className="mb-4" controlId="selectCollection">*/}
            {/*        <Form.Label>Select Collection to Update</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            className="pink-placeholder"*/}
            {/*            as="select"*/}
            {/*            value={selectedCollection}*/}
            {/*        >*/}
            {/*            <option value="">Select Collection</option>*/}
            {/*            <option value="1">Collection 1</option>*/}
            {/*            <option value="2">Collection 2</option>*/}
            {/*        </Form.Control>*/}
            {/*    </Form.Group>*/}
            {/*</Form>*/}

            {/*{selectedCollection && (*/}
            {/*    <AddCategoryTable selectedCollection={selectedCollection} />*/}
            {/*)}*/}
        </div>
    );
};

//const AddCategoryTable: React.FC<{ selectedCollection: string }> = ({
//    selectedCollection,
//}) => {
//    const collectionData: CollectionData = {
//        "1": [
//            { title: "Category 1 Title", description: "Description 1" },
//            // Add more data as needed
//        ],
//        "2": [
//            { title: "Category 2 Title", description: "Description 2" },
//            // Add more data as needed
//        ],
//    };

//    return (
//        <Table striped bordered hover>
//            <thead>
//                <tr>
//                    <th>Title</th>
//                    <th>Description</th>
//                    {/* Add more table headers as needed */}
//                </tr>
//            </thead>
//            <tbody>
//                {collectionData[selectedCollection].map((category, index) => (
//                    <tr key={index}>
//                        <td>{category.title}</td>
//                        <td>{category.description}</td>
//                        {/* Add more table cells based on your data structure */}
//                    </tr>
//                ))}
//            </tbody>
//        </Table>
//    );
//};
