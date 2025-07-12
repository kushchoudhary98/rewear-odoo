<Card title="User Schema">
  <Field label="firstName" type="String" note="Required, Min: 3, Max: 20" />
  <Field label="lastName" type="String" note="Optional, Min: 3, Max: 20" />
  <Field label="emailId" type="String" note="Required, Unique, Lowercase, Immutable" />
  <Field label="password" type="String" note="Required, hashed" />
  <Field label="age" type="Number" note="Optional, Min: 6, Max: 80" />
  <Field label="points" type="Number" note="Default: 50" />
  <Field label="role" type="String" note="Enum: 'user', 'admin'; Default: 'user'" />
  <Field label="cart" type="[ObjectId]" note="Item IDs user wants to redeem/buy" />
  <Field label="soldItems" type="[ObjectId]" note="Items user has successfully given away" />
  <Field label="createdAt" type="Date" note="Auto-generated" />
  <Field label="updatedAt" type="Date" note="Auto-updated" />
</Card>
