import { RightOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Divider,
	Popconfirm,
	Radio,
	Row,
	Table,
	Tooltip,
	Typography,
} from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
import Header from "../Commons/Header";
import {
	useRequestDelete,
	useRequestUpdate,
} from "../Hooks/useRequestUpdateMutation";
import { getRequests, getRequestStats } from "../Commons/apis/commonV1";
import HappyFace from "../assets/img/happy.png";
import infoIcon from "../assets/img/icons8-info.svg";
import makeStyles from '@mui/styles/makeStyles';
import MedicalHistoryWizard from "../Patient/MedicalHistoryWizard";
import React, { useEffect } from "react";
import { getMedicalHistory } from "./apis/patientV1";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	cardCtn: {
		marginBottom: "16px",
		[theme.breakpoints.down('md')]: {
			display: "flex",
		},
	},
}));

function Dashboard() {
	const { user } = useUserContext();
	const history = useHistory();
	const classes = useStyles();
	const { data, isLoading } = useQuery("requests-dashboard", async () => {
		const res = await getRequests({ queryParam: { limit: 20 } });
		return res.data;
	});
	const { data: statsData, isLoading: statsLoading } = useQuery(
		"requestStats",
		async () => {
			const res = await getRequestStats();
			return res.data;
		},
	);
	const { deleteRequestFn } = useRequestDelete("requests-dashboard");
	const { updateRequestFn } = useRequestUpdate("requests-dashboard");
	const [
		isMedicalHistoryWizardModalVisible,
		setMedicalHistoryWizardModalVisible,
	] = React.useState(false);

	// useEffect(async () => {
	//   let mounted = true;
	//   getMedicalHistory(user?._id)
	//     .then(items => {
	//       if(mounted && items != null && items.data.length == 0) {
	//         setMedicalHistoryWizardModalVisible(true);
	//       } else {
	//         setMedicalHistoryWizardModalVisible(false);
	//       }
	//     })
	//   return () => mounted = false;

	// }, []);

	function updateRequest(id, value) {
		const record = data.find((item) => item._id === id);
		if (record.isActive !== value) {
			updateRequestFn(id, { isActive: value });
		}
	}
	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Emergency",
			dataIndex: "isEmergency",
			key: "isEmergency",
			render: function (text) {
				return <label>{text === true ? "Yes" : "No"}</label>;
			},
		},
		{
			title: "Appointment",
			dataIndex: "isAppointment",
			key: "isAppointment",
			render: function (text) {
				return <label>Yes</label>;
			},
		},
		{
			title: "Pain Level",
			dataIndex: "painLevel",
			key: "painLevel",
		},
		{
			title: "Status",
			dataIndex: "isActive",
			key: "isActive",
			render: function (text, record) {
				// return <label>{text === true ? "Active" : "Inactive"}</label>;
				return (
					<Radio.Group
						buttonStyle="solid"
						defaultValue={text}
						onChange={(e) => updateRequest(record._id, e.target.value)}
						style={{
							minWidth: "225px",
						}}
					>
						<Radio.Button value={true}>Active</Radio.Button>
						<Radio.Button value={false}>Inactive</Radio.Button>
					</Radio.Group>
				);
			},
		},
		{
			title: "View Dentist Message",
			dataIndex: "View Dentist Message",
			key: "View Dentist Message",
			render: function (text, record) {
				return (
					<Link to={`/patients/messages/${record?._id}`}>
						<Button>View Messages</Button>
					</Link>
				);
			},
		},
		{
			title: "Actions",
			dataIndex: "Detail",
			key: "Detail",
			render: function (_, record) {
				return (
					<Popconfirm
						title="Are you sure to delete this Request?"
						onConfirm={() => deleteRequestFn(record._id)}
						okText="Yes"
						cancelText="No"
					>
						<Button>Delete</Button>
					</Popconfirm>
				);
			},
		},
		{
			title: "",
			dataIndex: "_id",
			render: function (_, record) {
				return (
					<Link to={`/patients/request/${record._id}`}>
						<RightOutlined />
					</Link>
				);
			},
		},
	];
	return (
		<>
			<div>
				<Header />
			</div>
			<div
				style={{
					maxWidth: "1600px",
					margin: "0 auto",
					width: "100%",
					marginTop: "4%",
				}}
				className={`paddingParent`}
			>
				<div className="d-flex align-items-center justify-content-between mt-2">
					<Typography.Title
						level={3}
						className="d-flex"
					>
						Welcome &nbsp; <span className="capitalize me-2">{user?.name}</span>
						<Tooltip title="Create new request by clicking below box">
							<img
								style={{ cursor: "pointer" }}
								src={infoIcon}
							></img>
						</Tooltip>
					</Typography.Title>
					<Button className="brix---btn-primary w-button btn-edit prim_btn_blue-outlined mb-2 h-auto fs-6" onClick={() => history.push(`/patients/create-request`)}>
						Connect to Dentist
					</Button>
				</div>
				<Divider />
				{/* <Row gutter={[16, 16]} className={classes.cardCtn}> */}
				<Row className={`${classes.cardCtn} flex-sm-row dashboard-cards`}>
					<Col
						span={4}
						className={`analyticsDash create-request-card`}
					>
						<Card
							// headStyle={{ backgroundColor: "#6fc4fd" }}
							headStyle={{ fontWeight: "bold" }}
							hoverable
							loading={statsLoading}
							title="CREATE REQUEST/ START HERE"
							type="inner"
							onClick={() => history.push(`/patients/create-request`)}
						>
							<div
								style={{fontWeight: 500}}
							>
								Make an appointment and <br></br> Connect to a live dentist.
								<p style={{color: '#0071bc', cursor: 'pointer'}}><u>Click here</u></p>
							</div>
						</Card>
					</Col>
					<Col
						span={4}
						className={`analyticsDash`}
					>
						<Card
							// headStyle={{ backgroundColor: "#6fc4fd" }}
							headStyle={{ fontWeight: "bold" }}
							hoverable
							loading={statsLoading}
							title="REQUESTS CREATED"
							type="inner"
						>
							<Typography.Title>
								{statsData?.active + statsData?.inActive}
							</Typography.Title>
						</Card>
					</Col>
					<Col
						span={4}
						className={`analyticsDash`}
					>
						<Card
							// headStyle={{ backgroundColor: "#6fc4fd" }}
							headStyle={{ fontWeight: "bold" }}
							hoverable
							loading={statsLoading}
							title="ACTIVE REQUESTS"
							type="inner"
						>
							<Typography.Title>{statsData?.active}</Typography.Title>
						</Card>
					</Col>
					<Col
						span={4}
						className={`analyticsDash`}
					>
						<Card
							// headStyle={{ backgroundColor: "#6fc4fd" }}
							headStyle={{ fontWeight: "bold" }}
							hoverable
							loading={statsLoading}
							title="INACTIVE REQUESTS"
							type="inner"
						>
							<Typography.Title>{statsData?.inActive}</Typography.Title>
						</Card>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col
						lg={24}
						xxl={18}
						xs={24}
						style={{ overflowY: "scroll" }}
					>
						<Table
							className="hover"
							loading={isLoading}
							columns={columns}
							dataSource={data}
							// className={"profileTable"}
							bordered={true}
							pagination={{ size: "small" }}
							style={{
								boxShadow: "0 7px 13px 0 rgba(0, 0, 0, 0.06)",
							}}
						/>
					</Col>
					<Col
						lg={24}
						xxl={6}
						xs={24}
					>
						<Card
							// headStyle={{ backgroundColor: "#6fc4fd" }}
							headStyle={{ fontWeight: "bold" }}
							hoverable
							loading={isLoading}
							title="Help your friends smile again"
							type="inner"
							style={{
								// maxWidth: "404px",
								height: "360px",
							}}
							className={classes.card}
						>
							<div
								style={{
									height: "280px",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<img
									src={HappyFace}
									alt=""
									width="128"
									height="128"
								/>
								<Typography.Text>
									Refer a friend to Teledental. Their healthy smile will reward
									you both.
								</Typography.Text>
								<Button>Invite Friends</Button>
							</div>
						</Card>
					</Col>
				</Row>
			</div>

			<MedicalHistoryWizard
				isModalVisible={isMedicalHistoryWizardModalVisible}
				setIsModalVisible={setMedicalHistoryWizardModalVisible}
			/>
		</>
	);
}

export default Dashboard;
