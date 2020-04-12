<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\UtilsController;
use App\Http\Model\LightModel;
use Validator;

class LightController extends Controller
{
    public function __construct(){
        $this->lightModel = new LightModel();
        $this->utilsController = new UtilsController();
    }

    //获取所有列表
    public function list(Request $request){
        $req = $request->all();
        $res = $this->lightModel->list($req);
        return $res ? $this->utilsController->responseMsg(0, 'success', $res) : $this->utilsController->responseMsg(-2, '获取失败', null);
    }
}
