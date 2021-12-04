import { useEffect } from "react"
import RenderUserListTable from "./UserListTableComponent";
import { connect } from "react-redux";
import { fetchUserList } from "../../redux/ActionCreators";
import DashBoard from "./DashboardComponent";

const headCells = [
    {
        id: 'ID',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Tài Khoản',
    },
    {
        id: 'isActive',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Tên',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Điện thoại',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Địa chỉ',
    },
    {
        id: 'Penalty',
        numeric: false,
        disablePadding: false,
        label: 'Cảnh cáo',
    },
];

const mapStateToProps = state => {
    return {
        user_list: state.user_list,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUserList: () => dispatch(fetchUserList())
});


function UserListTable(props) {

    useEffect(
        () => {
            props.fetchUserList()
        }, []
    )

    const rows = props.user_list.user_list;

    return (
        <div>
            <RenderUserListTable rows={rows} headCells={headCells} />
        </div>
    );
}

UserListTable = connect(mapStateToProps, mapDispatchToProps)(UserListTable);

export default function UserList() {
    return(
        <div className="row">
            <div className="col-2"><DashBoard /></div>
            <div className="col-10"><UserListTable /></div>
        </div>
    );
}