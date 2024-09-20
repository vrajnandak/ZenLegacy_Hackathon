from flask import Flask, render_template, request, jsonify,session,redirect

app = Flask(__name__)
selected_exercises=[]
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/submit-exercises", methods=["POST"])
def submit_exercises():
    data = request.json
    selected_exercises= data.get('exercises', [])
    print("Selected exercises:", selected_exercises)
    return jsonify({"status": "success", "exercises": selected_exercises})

@app.route('/exerciseCount')
def countExercise():
    return render_template('count.html',content=selected_exercises)
if __name__ == "__main__":
    app.run(debug=True)
