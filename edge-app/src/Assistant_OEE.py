from openai import OpenAI
import time

client = OpenAI()

thread = client.beta.threads.create()
  
assistant = client.beta.assistants.create(
  name="OEE Calculator",
  instructions="You are a OEE calculator. Write and run code to answer OEE questions.",
  tools=[{"type": "code_interpreter"}],
  model="gpt-4-turbo-preview"
)

message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I need to solve the json `{	
  "Line": "foam",
  "Shift": "2",
  "Morale": "0.00",
  "Quality": "1.00",
  "Version": "1.0.0",
  "Delivery": "100",
  "UniqueId": "809",
  "Timestamp": "2023-09-13T05:00:08.033-0500",
  "Performance": "0.67",
  "ScrapTarget": ".75",
  "Availability": "1.00",
  "BreakMinutes": "70",
  "DLEfficiency": "0.00",
  "ExpectedTime": "414",
  "ActualRuntime": "414",
  "ScheduledTime": "484",
  "UnitsProduced": "2791",
  "DefectiveUnits": "0",
  "ProductionDate": "2023-09-12T00:00:00",
  "ScheduledHours": "8.1",
  "DowntimeMinutes": "0",
  "ExpectedProduction": "4140"
}` to calculate OEE. Can you help me?"
)

run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Sanjay Bhatia. The user has a premium account."
)

  
while run.status in ['queued', 'in_progress', 'cancelling']:
  time.sleep(1) # Wait for 1 second
  run = client.beta.threads.runs.retrieve(
    thread_id=thread.id,
    run_id=run.id
  )

if run.status == 'completed': 
  messages = client.beta.threads.messages.list(
    thread_id=thread.id
  )
  print(messages)
else:
  print(run.status)



