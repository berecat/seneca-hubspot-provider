// import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import router from 'koa-joi-router';

// import { Joi } from 'koa-joi-router';
// import { dataSource } from '@/config/ormconfig';
// import { User } from '@/entities/user';
// import sso from '@/middleware/sso';
import env from '@/config/environment';
import { generateToken } from '@/middleware/sso';
import { errorResponse } from '@/schemas/common';
import * as schemas from '@/schemas/sso';

const sleep = (time: number | undefined) => new Promise((res: any) => setTimeout(res, time, "done sleeping"));

const ssoRouter = router();

ssoRouter.prefix('/sso');

ssoRouter.get('/login',
  {
    validate: {
      output: {
        200: {
          body: schemas.sso,
        },
        '400-599': {
          body: errorResponse,
        },
      }
    }
  },
  async (context) => {
    const { email } = context.query as schemas.LoginUser;
    const token = generateToken({ email: email === 'admin' ? 'renhaoming@shinetechsoftware.com' : email });
    const redirect = 'https%3A%2F%2Fknowledge.buzzbid.com%2Fsupport-center';
    const url = `${env.HUBSPOT_SSO_URL}?jwt=${token}&redirect_url=${redirect}`;

    if (!email) {
      context.throw(
        StatusCodes.BAD_REQUEST,
        // hack the validation: koi-joi-router do not support `validateAsync`, so the error has to be thrown manually
        // new Joi.ValidationError(
        //   'email is empty',
        //   [
        //     {
        //       path: ['password'],
        //       message: 'email is empty',
        //       type: 'wrong_password',
        //     },
        //   ],
        //   null,
        // ),
        'email is not found'
      );
    }

    // const result = await axios({
    //   method: 'get',
    //   url,
    // })
    //   .then((response: any) => {
    //     console.log(response);
    //     return response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     return error;
    //   });

    // !HACK: wait for 15 seconds to simulate the login process
    await sleep(15000);

    context.body = url;
  });

export default ssoRouter;
