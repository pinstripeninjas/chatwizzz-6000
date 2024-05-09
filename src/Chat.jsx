import { useEffect, useState } from "react";

function Chat({ username, channel }) {
	const [chatLog, setChatLog] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (channel) {
			channel.onmessage = (e) => {
				console.log("message received", e);
				setChatLog((prev) => [...prev, e.data]);
			};
		}
	}, [channel]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setChatLog((prev) => [...prev, { name: username, text: message }]);
		if (channel) {
			channel.postMessage({ name: username, text: message });
		}
		setMessage("");
	};

	return (
		<section>
			<article>
				<header>Welcome to the chat {username}!</header>
				<div className="chat-content">
					{chatLog.map((msg, idx) => (
						<p key={idx}>
							{msg.name ? (
								<strong>
									<em>{msg.name}: </em>
								</strong>
							) : null}
							{msg.text}
						</p>
					))}
				</div>
			</article>
			<form onSubmit={handleSubmit}>
				<fieldset className="grid">
					<input
						name="message"
						placeholder="Enter Message"
						aria-label="Enter Message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<input type="button" value="Send Message" onClick={handleSubmit} />
				</fieldset>
			</form>
		</section>
	);
}

export default Chat;
