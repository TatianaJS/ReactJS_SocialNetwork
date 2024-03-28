import React, { useState } from 'react';
import classes from '../../css/Paginator/Paginator.module.css';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, sectionAmount = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let sectionsAmount = Math.ceil(pagesCount / sectionAmount);
    let [sectionNumber, setSectionNumber] = useState(1);
    let leftSectionPageNum = (sectionNumber - 1) * sectionAmount + 1;
    let rightSectionPageNum = sectionNumber * sectionAmount;
    
    return (
        <div className={classes.nav_pages}>
            {sectionNumber > 1 &&
                <div>
                    <button onClick={() => {
                        onPageChanged(pages[0])
                        setSectionNumber(1)}}>
                        К началу
                    </button>
                    <button onClick={() => {setSectionNumber(sectionAmount - 1)}}>
                        Пред.
                    </button>
                </div>
            }
            {pages
                .filter(page => page >= leftSectionPageNum && page <= rightSectionPageNum)
                .map((page, index) => {
                    return (
                        <span 
                            key={index}
                            className={currentPage === page ? classes.selected_page : classes.pg}
                            onClick={(e) => {onPageChanged(page)}}>
                            {page}
                        </span>
                    );
                })}
            {sectionsAmount > sectionNumber &&
                <div>
                    <button onClick={() => {setSectionNumber(sectionNumber + 1)}}>
                    След.
                    </button>
                    <button onClick={() => {
                        onPageChanged(pages[pages.length - 1])
                        setSectionNumber(sectionsAmount)}}>
                            На последнюю
                        </button>
            </div>
            }
        </div>
    )
}

export default Paginator;