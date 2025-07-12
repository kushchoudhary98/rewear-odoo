<Card title="Swap Schema">
  <Field label="itemId" type="ObjectId" note="Reference to Item (required)" />
  <Field label="fromUserId" type="ObjectId" note="User initiating the request" />
  <Field label="toUserId" type="ObjectId" note="User receiving the request (optional for redemption)" />
  <Field label="type" type="String" note="Enum: 'direct', 'points'; Required" />
  <Field label="status" type="String" note="Enum: 'requested', 'accepted', 'completed', 'cancelled'; Default: 'requested'" />
  <Field label="createdAt" type="Date" note="Auto-generated" />
  <Field label="updatedAt" type="Date" note="Auto-updated" />
</Card>
