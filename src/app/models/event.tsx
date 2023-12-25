import mongoose, {Schema} from 'mongoose';

const EventSchema = new Schema();

const Event = mongoose.models.Event || mongoose.model('Event_list', EventSchema);

export default Event;
