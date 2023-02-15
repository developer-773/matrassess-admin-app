import "./Button.css"

export const Button = ({ text }) => {

	return <button className="reusable" type="submit">{	text ? text : "Qo'shish"
}</button>;
};
