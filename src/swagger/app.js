const React = require('react')
const axios = require('axios')

const routes = [
	{
		name: '用户模块',
		children: [
			{
				name: '/user/login',
				methods: 'post',
				type: 'body',
				value: {
					username: 'string',
					password: 'string',
				},
			},
		],
	},
	// {
	// 	name: '动态模块',
	// 	children: [{
	//     name:'/trend',
	//     methods:'post',
	//     id:2
	//   }],
	// },
]
function Demo() {
	const [currentIndex, setIndex] = React.useState(-1)
	const [currentModule, setCurrentModule] = React.useState(-1)
	const [value, setvalue] = React.useState('')

	const [res, setRes] = React.useState('')
	// const add=()=>{
	//   setIndex(index+1)
	// }
	const changeModule = (index) => {
		if (currentModule === index) {
			setCurrentModule(-1)
		} else {
			setCurrentModule(index)
			setIndex(-1)
		}
	}

	const changIndex = (index) => {
		if (currentIndex === index) {
			setIndex(-1)
		} else {
			setIndex(index)
		}
	}

	React.useEffect(() => {
		if (currentIndex !== -1 && currentModule !== -1) {
			setvalue(routes[currentModule].children[currentIndex].value)
		}
	}, [currentIndex, currentModule])

	const send = async (url, method) => {
		console.log(url)
		const res = await axios.default[method](url, value)
		setRes(res?.data)
	}
	return (
		<div className="app">
			<h1 className="title"></h1>
			{routes.map((item, index) => {
				return (
					<ul className="api" key={item.name}>
						<div
							className="api-title"
							onClick={() => {
								changeModule(index)
							}}
						>
							{item.name}
						</div>
						{currentModule === index ? (
							<>
								{item.children.map((citem, cindex) => {
									return (
										<li
											className="api-item"
											key={citem.name}
										>
											<div className="item-content">
												<div
													className="item-title"
													onClick={() => {
														changIndex(cindex)
													}}
												>
													<div className="item-method">
														{citem.methods}
													</div>
													<div className="item-path">
														{citem.name}
													</div>
												</div>
												{currentIndex === cindex ? (
													<div className="item-info">
														<div className="request">
															<div className="params">
																<div className="left">
																	{citem.type}
																	<div
																		className="btn"
																		onClick={() => {
																			send(
																				citem.name,
																				citem.methods
																			)
																		}}
																	>
																		发送
																	</div>
																</div>
																{citem.type ===
																'body' ? (
																	<input
																		type="textarea"
																		className="right"
																		value={JSON.stringify(
																			value
																		)}
																		onChange={(
																			e
																		) => {
																			try {
																				setvalue(
																					JSON.parse(
																						e
																							.target
																							.value
																					)
																				)
																			} catch (error) {
																				console.log(
																					error
																				)
																			}
																		}}
																	></input>
																) : null}
															</div>
														</div>
														<div className="response">
															{JSON.stringify(
																res
															)}
														</div>
													</div>
												) : null}
											</div>
										</li>
									)
								})}
							</>
						) : null}
					</ul>
				)
			})}
		</div>
	)
}
function App() {
	const click = () => {
		console.log(123)
	}
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="stylesheet" href="/styles.css"></link>
				<title>My app</title>
			</head>
			<body>
				<Demo />
			</body>
		</html>
	)
}

module.exports = App
