import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './columns';
import { Grid, Paper } from '@material-ui/core';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import { useParams } from 'react-router-dom';


export const Booklist = () => {

    const [park, setpark] = useState([])
    const { id } = useParams();

    useEffect(() => {
        fetch(JSON.parse('localhost:8000/owner/parks/pending/' + id))
            .then(res => {
                return res.json();
            })
            .then(data => {
                setpark(data.list);
                console.log(data);
            });
    }, []);

    const column = useMemo(() => COLUMNS, [])

    const TableInstance = useTable({
        columns: column,
        data: park
    })


    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow, } = TableInstance
    return (
        < div className='book-advance' >

            <Grid align='center'>
                <h1>Thông tin đặt trước </h1>
                &emsp;
            </Grid>
            &emsp;
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Headers')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <br />
            &emsp;
        </div >
    );
}



