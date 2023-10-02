import React, { useEffect, useState } from 'react';
import PartnerListItem from './PartnerListItem';
import Pagination from '../../../modules/components/pagination';

const AllPartners = ({ itemsPerPage, items }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // side effect
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);
    // handlePageClick
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems && currentItems.map((item, i) => {
                return (
                    <div key={i} className="col-lg-4 col-md-6">
                        <div className="edu-event event-style-1">
                            <PartnerListItem item={item} />
                        </div>
                    </div>
                )
            })}
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </>
    )
}

export default AllPartners;