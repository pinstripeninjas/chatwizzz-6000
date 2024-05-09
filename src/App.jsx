import { useState } from "react";
import Chat from "./Chat";

function App() {
	const [name, setName] = useState("");
	const [channel, setChannel] = useState(null);
	const [username, setUsername] = useState(null);

	const handleJoinChat = (e) => {
		e.preventDefault();
		setUsername(name);
		setName("");
		const bc = new BroadcastChannel("test-channel");
		bc.postMessage({ name: null, text: `--- ${name} has joined the chat ---` });
		setChannel(bc);
	};

	return (
		<>
			<main className="container">
				<section>
					{!username ? (
						<form onSubmit={handleJoinChat}>
							<fieldset className="grid">
								<input
									name="name"
									placeholder="Enter Name"
									aria-label="Enter Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<input type="button" value="Join Chat" onClick={handleJoinChat} />
							</fieldset>
						</form>
					) : (
						<h2>Chatwizzz 6000</h2>
					)}
				</section>
				{username ? <Chat username={username} channel={channel} /> : null}
			</main>
		</>
	);
}

export default App;
