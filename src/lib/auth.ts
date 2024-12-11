import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db';
import * as schema from './server/db/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema
	}),

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false
	},

	rateLimit: {
		storage: 'database',
		modelName: 'rateLimit', // optional by default "rateLimit" is used
		window: 60, // time window in seconds
		max: 100, // max requests in the window
		customRules: {
			'/admin/*': {
				window: 10,
				max: 3
			}
		}
	}
});
